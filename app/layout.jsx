import Nav from '@components/Nav'
import '@styles/globals.css'

export const metadata = {
    title: 'Tracking',
    description: 'Let\'s track some stuff!'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
                {/* <div className='gradient'/>
            <div className='main'>
            </div> */}
            <div className='main bg-tiffany-200'></div>
            <main className='relative z-10 flex flex-col items-center justify-center mx-auto max-w-7xl sm:px-16'>
                <Nav />
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout