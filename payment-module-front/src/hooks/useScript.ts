import React, { useEffect } from 'react';


function useScript(url: string) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        document.body.append(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
}

export default useScript;