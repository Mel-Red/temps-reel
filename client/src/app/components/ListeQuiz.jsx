'use client'

import styles from "@/app/page.module.css";
import {useEffect, useState} from "react";


export default function ListQuiz() {


    const IndexPage = () => {
        const [data, setData] = useState(null);
    }

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('/api/getAllQuizz');
          const responseData = await response.json();
          setData(responseData);
        };
    
        fetchData();
      }, []);

      return (
        <div>
            {data.map(libelle => <p>{libelle}</p>)}
        </div>
      );
    };