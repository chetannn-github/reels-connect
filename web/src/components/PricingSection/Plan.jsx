import { useSelector } from 'react-redux';
import { getPlanIndex } from '../../lib/constant';
import usePaymentStore from '../../pages/Home/store/usePaymentStore';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/Button";
import { Check, Loader2 } from "lucide-react";

function Plan({plan, index}) {
    const user = useSelector((state) => state.auth?.user);
    const Icon = plan.icon;
    const {isLoading, createOrder, handleIGAuth } = usePaymentStore();
    const navigate = useNavigate();
    const current_plan = user?.plan;
    const planIndex = getPlanIndex(current_plan);

    return (
        <div
            key={plan.name}
            className={`relative group ${plan.popular ? 'transform lg:scale-110 lg:-translate-y-4' : ''}`}
        >
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                    </span>
                </div>
            )}

            <div
                className={`glass-effect p-8 rounded-2xl card-shadow h-full transition-all duration-500 hover:scale-105 ${
                plan.popular ? 'border-2 border-primary/50 glow-effect' : ''
                }`}
            >
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className={`p-3 rounded-xl ${
                        plan.name === 'Free' ? 'bg-muted/20' :
                        plan.name === 'Pro' ? 'bg-primary/20' :
                        'bg-accent/20'
                        }`}>
                        <Icon className={`w-8 h-8 ${
                            plan.name === 'Free' ? 'text-muted-foreground' :
                            plan.name === 'Pro' ? 'text-primary' :
                            'text-accent'
                        }`} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <div className="mb-6">
                        <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Button */}
                {user && <Button
                onClick  = {()=> createOrder(plan.type, navigate)}
                variant={plan.buttonVariant} 
                size="lg" 
                className="w-full"
                disabled={planIndex >= index}

                >
                    {isLoading === plan.type && <><Loader2 className="h-4 w-4 animate-spin" /> {plan.buttonLoadingText} </>}
                    {isLoading !== plan.type && plan.buttonText}
                </Button>}


                {!user && <Button 
                onClick  = {()=> handleIGAuth(plan?.type) }
                variant={plan.buttonVariant} 
                size="lg" 
                className="w-full"
                >
                    {isLoading === plan.type && <><Loader2 className="h-4 w-4 animate-spin" /> {plan.buttonLoadingText} </>}
                    {isLoading !== plan.type && plan.buttonText}
                </Button>}
            </div>
        </div>
    );
}

export default Plan