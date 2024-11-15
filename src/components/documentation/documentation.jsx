import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiDocumentation = () => {
  const [docHtml, setDocHtml] = useState('');

  useEffect(() => {
  
    axios.get('http://localhost:3000/api/v1/docs')
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
