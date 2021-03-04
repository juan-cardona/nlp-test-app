import  { useState } from 'react';

export default function App({posts}) {
  const [data, setData] = useState(posts);
  const postUserPrompt = async event => {
    event.preventDefault()
    const res = await fetch(
      'http://127.0.0.1:8001/generative/',{
        method: 'POST',
        body: JSON.stringify({input: event.target.name.value})
      });
    const newData = await res.json();
    return setData(newData);
  };
  return (
    <div className='flex-row p-4 m-8 '>
      <div>
      <h1 className='text-xl flex-1'>Texto Generado por AI</h1>
      <form className="flex justify-between m-6" onSubmit={postUserPrompt}>
        <input id="name" name="name" type="text" autoComplete="name" placeholder="Empieza a escribir algo" required />
        <button type="submit">Generar texto</button>
        </form>
      </div>  
          <h3 className='text-base flex-1'>Output: { data.output }</h3>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('http://127.0.0.1:8000/generative/',{
    method: 'POST',
    body: JSON.stringify({input: 'Why this doesnt work  '})
  });
  const data = await res.json();
  return {
    props:{
      posts: data
    }
  }
}