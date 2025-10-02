import { plans } from "../../../lib/utils";
import Plan from "../../../components/PricingSection/Plan";

const PricingSection = () => {
  return (
    <section className="py-24 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Growth Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, index) => <Plan plan={plan} key={index} index = {index}/>)}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">
            All plans include our core automation features and 24/7 support
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;