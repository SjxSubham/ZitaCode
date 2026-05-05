import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header"
import NetworkStatusToast from "./_components/NetworkStatusToast";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
    return (
      <div className="min-h-name">
        <div className="max-w-[1800px] mx-auto px-4">
        <NetworkStatusToast />
         <Header/>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
           <EditorPanel/>
           <OutputPanel/>
          </div>
       </div> 
      </div>
    );
  }
  