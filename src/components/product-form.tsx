"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useLocale } from 'next-intl';
 

export default function ProductForm( {productName, productDesc, productImage}: {productName: string, productDesc: string, productImage: string}) {
  const router = useRouter();
  const localActive = useLocale();
  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<{
    inputName: string;
    inputDescription: string;
    image: File | null;
  }>({
    defaultValues: {
      inputName: "",
      inputDescription: "",
      image: null,
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const base64data = reader.result;
        if (typeof base64data === 'string') {
          console.log(base64data);
        }
      };
    }

    const response = await fetch('/api/product-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName : inputName,
        productDesc : inputDescription,
        image : image,
      }),
    });

    if (!response.ok) {
      console.error('Failed to submit form');
    }

    const data = await response.json();
    const id = data.id;
    console.log(id);

    router.push(`${localActive}/product?id=${id}`);

  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  return (
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="inputName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{productName}</FormLabel>
                <FormControl>
                  <Input 
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="dog cart"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inputDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{productDesc}</FormLabel>
                <FormControl>
                  <Input 
                    value={inputDescription}
                    onChange={(e) => setInputDescription(e.target.value)}
                    placeholder="dog cart is easy to use" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{productImage}</FormLabel>
                <FormControl>
                  <Input id="picture" type="file" onChange={handleImageChange}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline">Submit</Button>
        </form>
      </Form>
  );
}
