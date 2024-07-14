import './Footer.scss';
import { Divider } from '@chakra-ui/react';
const Footer = () => {
  return (
    <div className='footer'>
      <Divider/>
      <div className='flex justify-center p-6'>
        <p>© ProjectHUB 2024, All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer