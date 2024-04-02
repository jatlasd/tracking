'use client';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
} from '@tremor/react';
import CardContainer from "./CardContainer"; 

const AccordionComponent = ({ entries }) => { 
  return (
<AccordionList>
    <Accordion className='border-none'>
        <AccordionHeader className='text-xl font-semibold bg-tiffany-400 font-satoshi border-none'>See Entry Cards</AccordionHeader>
        <AccordionBody>
          <CardContainer entries={entries} className='pb-10'/> 
        </AccordionBody>
    </Accordion>
</AccordionList>
  )
}

export default AccordionComponent