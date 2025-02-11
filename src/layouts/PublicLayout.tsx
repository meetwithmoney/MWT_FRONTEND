import { Suspense } from "react";
import PublicHeader from "./PublicHeader";

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout = (props: PublicLayoutProps) => {

  const { children } = props;

  return (
    <div className="bg-light-gray-200 min-h-screen">
      <PublicHeader />
      <div>
        <Suspense>
          <div className="  chatwithmeet__container">{children}</div>
        </Suspense>
      </div>
      {/* <PublicFooter /> */}
    </div>
  );
};

export default PublicLayout;
