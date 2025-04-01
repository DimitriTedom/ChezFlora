import { cn } from "@/lib/utils";

interface TitleProps {
  title: string;
  comment?: string;
  snowStyle?: string;
}

const FormTitle = ({ title, comment, snowStyle }: TitleProps) => {
  return (
    <div className={cn('gap-4 flex flex-col items-center xl:text-center', snowStyle)}>
      <h1 className="text-[2rem] md:text-[3rem] lg:text-[4.5rem] font-bold font-Poppins text-center">
        {title}
      </h1>
      <h6 className="text-[1rem] md:text-[1.2rem] font-normal text-gray-600 text-center">
        {comment}
      </h6>
    </div>
  );
};

export default FormTitle;
