import { useEffect, useState } from 'react';

const usePersonalInformation = (auth: any) => {
  const [showOthers, setShowOthers] = useState(false)
  const [showOthers2, setShowOthers2] = useState(false)
  const [secondCheck, setSecondCheck] = useState<any>([])
  const [lastCheck, setLastCheck] = useState<any>([])


  useEffect(() => {
    if (auth && auth.path) {
      const parsedPath = JSON.parse(auth.path);
      console.log(parsedPath);
      console.log('ttttac ',parsedPath.some((e:any) =>
      ['assistant', 'front desk', 'secretary', 'security'].includes(e.toLowerCase())
    ));

      setShowOthers(Array.isArray(parsedPath)
        ? parsedPath.some((e) =>
            ['assistant', 'front desk', 'secretary', 'security'].includes(e.toLowerCase())
          )
        : false);

      setShowOthers2(Array.isArray(parsedPath)
        ? parsedPath.filter((e) => !['parent', 'teacher', 'school admin'].includes(e.toLowerCase()))
            .length > 0
        : false);

      setSecondCheck(Array.isArray(parsedPath)
        ? parsedPath.filter((e) => !['parent', 'teacher', 'school admin'].includes(e.toLowerCase()))
        : []);

      setLastCheck(secondCheck.filter(
        (e: any) => !['assistant', 'front desk', 'secretary', 'security'].includes(e.toLowerCase())
      ));
    }
  }, [auth]);



  return {
    lastCheck,
    showOthers,
    showOthers2,
    secondCheck,
  };
};

export default usePersonalInformation;