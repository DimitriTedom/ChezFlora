interface title {
    title :string,
    comment : string,
}

const FormTitle = ({title,comment}:title) => {
  return (
    <div className='gap-4 flex flex-col items-center xl:text-center'>
    <h1 className=" text-[2rem] md:text-[3rem] lg:text-[4.5rem] font-bold">{title}</h1>
    <h6 className='text-[1rem] md:text-[1.2rem] font-normal text-gray-400 text-center'>{comment}</h6>
    </div>
  )
}

export default FormTitle