'use client';
import * as React from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"


export default function LocalSwitcher( {dropdown, lang}: {dropdown: string, lang: string} ) {
  // const t = useTranslations('IndexPage');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  
  const onSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextLocale = e.target.value;
    console.log(nextLocale);
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{dropdown}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{lang}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup defaultValue={localActive} onValueChange={(value: string): void => onSelectChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}>
              <DropdownMenuRadioItem value="en" >English</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ms" >Bahasa Melayu</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ar" >Arabic</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
  );
}
