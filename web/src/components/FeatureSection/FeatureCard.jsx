function FeatureCard({feature, index}) {
  const Icon = feature.icon;
    return (
        <div
            key={feature.title}
            className="group"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
        <div className="glass-effect p-8 rounded-2xl card-shadow h-full transition-all duration-500 hover:scale-105 hover:glow-effect">
            <div className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-8 h-8 ${feature.color}`} />
            </div>
            
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
            {feature.description}
            </p>
        </div>
        </div>
    );
}

export default FeatureCard