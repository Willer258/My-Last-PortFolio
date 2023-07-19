import React from "react";
import MainHead from "../SpecialComponent/MainHead";
import Footer from "./Footer";
import SideNav from "./SideNav";
import { useRecoilState } from "recoil";
import { showProverbs } from "@/utils/atomes";
import LoadingAnimatePage from "../Shared/LoadingAnimatePage";

const Layout = ({ children }: any) => {
  const [showText] = useRecoilState(showProverbs);


  return (
    <div>
   
      <MainHead />
      {!showText ?<SideNav />:null }

      
          {showText ? (
       
         
            <LoadingAnimatePage />
       
    
      ) : (
        <div className="ml-16 md:ml-32">{children}</div>
      )
      }
    
    </div>
  );
};

export default Layout;
