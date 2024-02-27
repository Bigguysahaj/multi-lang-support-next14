import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';


export async function POST(req, res) {
    if (req.method === 'POST') {
        const { productName, productDesc, productImage } = await req.json();

        const client = await MongoClient.connect(process.env.MONGODB_URI);

        let id;
        const db = client.db("lang-ecom");

        const languages = ['AR', 'ID'];

        const translations = await Promise.all(
          languages.map(async (lang) => {
              const translatedName = await translateText(productName, lang);
              const translatedDesc = await translateText(productDesc, lang);
              let langKey = lang.toLowerCase();
              if (langKey === 'id') {
                langKey = 'ms';
              }
              return { 
                [langKey]: {  
                    productName: translatedName,
                    productDesc: translatedDesc
                }
              };
          })
      );

        const translatedProduct = translations.reduce(
          (obj, translation) => ({ ...obj, ...translation }),
          { en : { productName, productDesc } }
        );

        const result = await db.collection('forms').insertOne({ ...translatedProduct, productImage });
        id = result.insertedId;

        client.close();

        return NextResponse.json({ message: 'Form data saved.', id });
    } else {
        return NextResponse.json({ message: 'Method not allowed.' });
    }
}

async function translateText(text, targetLang) {
  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
    },
    body: `text=${encodeURIComponent(text)}&target_lang=${targetLang}`,
  });
  
  if (!response.ok) {
    throw new Error('Failed to translate text');
  }
  
  const data = await response.json();
  return data.translations[0].text;
}

export async function GET(req, res) {
  if (req.method === 'GET') {
    const id = req.nextUrl.searchParams.get('id');
    const locale = req.nextUrl.searchParams.get('locale');
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("lang-ecom");
    const obj = new ObjectId(id);


    const forms = await db.collection('forms').findOne({ _id: obj } , { projection: { [locale]: 1 } });
    console.log(forms);

    client.close();

    return NextResponse.json(forms);
  } else {
    return NextResponse.json({ message: 'Method not allowed.' });
  }
}