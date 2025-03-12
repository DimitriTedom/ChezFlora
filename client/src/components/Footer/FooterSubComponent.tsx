import TitleComponent from "./title.Component";
import SubTitleComponent from "./SubTitle.Component";

interface FooterSubComponentProps {
  title: string;
  title1: string;
  title2: string;
  title3: string;
  title4?: string;
  title5?: string;
  to1: string;
  to2: string;
  to3: string;
  to4?: string;
  to5?: string;
}

const FooterSubComponent = ({
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  to1,
  to2,
  to3,
  to4,
  to5,
}: FooterSubComponentProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <TitleComponent title={title} />
      <div className="flex flex-col space-y-2">
        <SubTitleComponent Subtitle={title1} to={to1} />
        <SubTitleComponent Subtitle={title2} to={to2} />
        <SubTitleComponent Subtitle={title3} to={to3} />
        {title4 && <SubTitleComponent Subtitle={title4} to={to4} />}
        {title5 && <SubTitleComponent Subtitle={title5} to={to5} />}
      </div>
    </div>
  );
};

export default FooterSubComponent;
