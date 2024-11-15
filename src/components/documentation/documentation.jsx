import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';

const ApiDocumentation = () => {
  const [docHtml, setDocHtml] = useState('');

  useEffect(() => {
  
    axios.get(`${BASE_URL}/docs`)
      .then((response) => {
        setDocHtml(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the documentation:", error);
      });
  }, []);

  return (
    <div>

      <div dangerouslySetInnerHTML={{ __html: docHtml }} />
    </div>
  );
};

export default ApiDocumentation;
