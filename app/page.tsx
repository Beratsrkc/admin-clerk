'use client'
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddACategory from "@/components/AddACategory";
import UpdateCategory from "@/components/UpdateCategory";

export default function Home() {

  const [categories, setcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


  async function fetchcategories() {
    try { 
      const response = await axios.get("/api/categories")
      setcategories(response.data)
      
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function deleteCategory(id:string) {
    try {
      await axios.delete(`/api/categories/${id}`)
      fetchcategories();
      
    } catch (error) {
      console.error("Error delete categories:", error);
    }
  }

  useEffect(()=>{
    fetchcategories();
  },[])

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mt-4 font-semibold mb-8">Categories</h1>
      <AddACategory fetchCategories={fetchcategories}/>
      {selectedCategory &&(
        <UpdateCategory
        category={selectedCategory}
        fetchCategories={fetchcategories}
        isOpen={isUpdateModalOpen}
        onClose={()=>setIsUpdateModalOpen(false)}
        
        />
      )}
      <Table>
      <TableCaption>A list of your recent categorys.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">#</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.id}</TableCell>
            <TableCell>{category.title}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell className="text-right flex flex-row gap-2">
              <Button onClick={()=>{setSelectedCategory(category); setIsUpdateModalOpen(true)}}>Edit</Button>
              <Button onClick={()=>deleteCategory(category.id)} variant={"destructive"}>Delete</Button>


            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
    </div>
  );
}
