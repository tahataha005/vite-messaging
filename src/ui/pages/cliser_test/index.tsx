import React, { useEffect } from "react";
import { cliser_client } from "cliser_client";

const Test = () => {
  useEffect(() => {
    const load = async () => {
      const response = await cliser_client.get(
        "http://jsonplaceholder.typicode.com/posts"
      );

      console.log(response);
    };

    load();
  }, []);

  return <div>Test</div>;
};

export default Test;
