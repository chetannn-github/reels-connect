import { useDashboardStore } from '../../../pages/Dashboard/useDashboardStore';
import { Card, CardContent} from '../../ui/Card';

function ReelCard({reel}) {
    const token = localStorage.getItem('jwt');
    const {selectedReel, handleReelSelection} = useDashboardStore();
    
    return (
        <Card 
            key={reel._id} 
            className={`cursor-pointer transition-all duration-300 
                hover-scale hover:shadow-xl border-0 bg-gradient-to-br 
                from-background to-muted/30 backdrop-blur-sm overflow-hidden flex-shrink-0 w-40 gap-4 ${
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
                
                {selectedReel === reel._id && (
                    <div className="absolute top-3 left-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                )}
                </div>
                
                <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {reel.reelTitle}
                    </h3>
                </div>
            </CardContent>
        </Card>
    )
}

export default ReelCard