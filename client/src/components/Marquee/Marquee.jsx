import { useEffect, useRef, useCallback } from 'react';
import './index.scss'

const Marquee = () => {

   const parentSelectorRef = useRef(null)

   const marquee = useCallback((parentSelectorRef, speed) => {
       const parentSelector = parentSelectorRef.current;
       const clone = parentSelector.innerHTML;
       const firstElement = parentSelector.children[0];
       let i = 0;

       parentSelector.insertAdjacentHTML('beforeend', clone);
       parentSelector.insertAdjacentHTML('beforeend', clone);
     
       setInterval(function () {
         firstElement.style.marginLeft = `-${i}px`;
         if (i > firstElement.clientWidth) {
           i = 0;
         }
         i = i + speed;
       }, 0);
   }, []);

   useEffect(() => {
       if(parentSelectorRef.current){
           marquee(parentSelectorRef, 0.5)
       }
   }, [parentSelectorRef, marquee])

   return (
       <div ref={parentSelectorRef} className='marquee'>
           <span>Seamlessly connect with coffee varieties across different stores. Compare.</span>
       </div>
   )
}

export default Marquee
