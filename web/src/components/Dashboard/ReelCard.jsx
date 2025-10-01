import { useDashboardStore } from '../../pages/Dashboard/useDashboardStore';
import { Card, CardContent} from '../ui/Card';
import {  Play } from 'lucide-react';


function ReelCard({reel}) {
    const token = localStorage.getItem('jwt');
    const {selectedReel, handleReelSelection} = useDashboardStore()
  return (
    <Card 
        key={reel._id} 
        className={`group cursor-pointer transition-all duration-300 hover-scale hover:shadow-xl border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm overflow-hidden flex-shrink-0 w-72 ${
            selectedReel === reel._id 
            ? 'ring-2 ring-primary shadow-2xl shadow-primary/20 bg-gradient-to-br from-primary/5 to-primary/10' 
            : 'hover:ring-1 hover:ring-primary/50'
        }`}
        onClick={() => handleReelSelection(reel._id, token)}
        >
        <CardContent className="p-0">
            <div className="relative overflow-hidden">
            <img 
                src={reel.thumbnailURL || reel.mediaURL} 
                className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </div>
            </div>
            
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                <Play className="w-3 h-3 inline mr-1" fill="white" />
                {reel.views}
            </div>
            
            {selectedReel === reel._id && (
                <div className="absolute top-3 left-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                <div className="w-2 h-2 bg-white rounded-full" />
                </div>
            )}
            </div>
            
            <div className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {reel.reelTitle}
            </h3>
            
            
            </div>
        </CardContent>
    </Card>
  )
}

export default ReelCard