import { useTranslations } from 'next-intl';
import Product from '@/components/product';
import React from 'react';

export default function Home() {
  const t = useTranslations('IndexPage');

  return (
    <div>
      {/* <h1 className='text-4xl mb-4 font-semibold'>{t('title')}</h1>
      <br /> */}
      <Product productName="Product Name" productDesc="Product Description"/>
    </div>
  );
}
