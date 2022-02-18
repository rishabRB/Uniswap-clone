import Header from '../components/Header'
import Main from '../components/Main'

const style={
  wrapper:`h-screen max-h-screen h-min-screen bg-[#2D232F] text-white select-none flex flex-col justify-between`
}

export default function Home() {
  return (
	  <div className={style.wrapper}>
		  <Header />
		  <Main />
		  <div>Transactionn history</div>
	  </div>
  )
}
