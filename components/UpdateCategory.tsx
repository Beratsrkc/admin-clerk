'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm     } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'


interface UpdateACategoryProps{
    fetchCategories :()=>void;
    isOpen:boolean;
    onClose:()=>void
    category:{id:string, title:string, description:string}
}


const UpdateCategory = ({fetchCategories,category,isOpen,onClose}:UpdateACategoryProps) => {

    const formSchema = z.object({
        title: z.string().min(2, {
            message: "Title must be at least 2 characters.",
        }),
        description: z.string().min(2, {
            message: "Description must be at least 2 characters.",
        }),
    })
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: category.title,
            description: category.description
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
    
        try {
            await axios.put(`/api/categories/${category.id}`,
                 {title:values.title, description:values.description})
            fetchCategories();
            onClose();
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button>Edit A Category</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a New Category</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateCategory
