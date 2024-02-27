'use client';
import * as React from 'react';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react'; 
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Product( {productName, productDesc} : {productName: string, productDesc: string}) {

	const [product, setProduct] = useState({ productName: '', productDesc: '' }); 
	const [productImage, setProductImage] = useState(null);
	const searchParams = useSearchParams()
	const id = searchParams.get('id')
	const localActive = useLocale();

	const getProducts = async () => {
		const response = await fetch(`/api/product-form?id=${id}&locale=${localActive}`);
		return await response.json();
	}
	
	useEffect(() => {
		console.log(localActive);
		getProducts().then(prod => {
			setProductImage(prod.productImage);
			setProduct(prod[localActive]);
		});
	}, [localActive]);
  return (
	<div className="flex flex-col justify-center items-center ">
		<h1 className="text-6xl p-6">{productName.split(" ")[0]}</h1>
		<Carousel className="w-full max-w-xs">
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index}>
						<div className="p-1">
							<Card>
								<CardContent className="flex flex-col aspect-square items-center justify-center p-6">
									<img src={productImage ? URL.createObjectURL(productImage) : undefined} alt={product.productName} />
									<span className="text-4xl font-semibold">{product.productName}</span>
									<span className="text-4xl font-semibold">{product.productDesc}</span>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	</div>
  )
}
