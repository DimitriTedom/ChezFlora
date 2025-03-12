interface title {
    title:string
}
const TitleComponent = ({title}:title) => {
  return (
    <h6 className="font-bold text-[1.6rem] text-pink-500">{title}</h6>
  )
}

export default TitleComponent