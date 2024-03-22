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
    <Accordion>
        <AccordionHeader className='text-xl font-semibold bg-blue-400 font-satoshi'>See Entry Cards</AccordionHeader>
        <AccordionBody >
          <CardContainer entries={entries} /> 
        </AccordionBody>
    </Accordion>
</AccordionList>
  )
}

export default AccordionComponent