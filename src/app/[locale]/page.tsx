import { useTranslations } from 'next-intl';
import ProductForm from '@/components/product-form';
import React from 'react';

export default function Home() {

  const t = useTranslations('IndexPage');
  

  return (
    <div>
      <h1 className='text-4xl mb-4 font-semibold'>{t('title')}</h1>
      <br />
      <p>{t('description')}</p>
      <br />
      <ProductForm productName={t('productName')} productDesc={t('productDesc')} productImage={t('productImage')} />
    </div>
  );
}
