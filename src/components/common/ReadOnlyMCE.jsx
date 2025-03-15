import React, { useEffect, useRef } from "react";

const ReadOnlyMCE = ({ initialValue }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = initialValue || "";
    }
  }, [initialValue]);

  return <div ref={contentRef} className="prose prose-slate max-w-none" />;
};

export default ReadOnlyMCE;
