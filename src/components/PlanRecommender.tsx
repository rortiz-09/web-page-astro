import { useState } from 'react';

interface PlanRecommenderProps {
    mode: 'residential' | 'business';
}

interface Question {
    id: string;
    text: string;
    options: { label: string; value: string }[];
}

const questions: Record<'residential' | 'business', Question[]> = {
    residential: [
        {
            id: 'devices',
            text: '¿Cuántos dispositivos se conectan simultáneamente en tu hogar?',
            options: [
                { label: '1 - 3', value: 'low' },
                { label: '4 - 7', value: 'medium' },
                { label: '8 o más', value: 'high' },
            ],
        },
        {
            id: 'usage',
            text: '¿Cuál es el uso principal del internet?',
            options: [
                { label: 'Redes Sociales y Navegación', value: 'basic' },
                { label: 'Streaming HD (Netflix, YouTube)', value: 'streaming' },
                { label: 'Gaming, Trabajo Remoto, 4K', value: 'heavy' },
            ],
        },
    ],
    business: [
        {
            id: 'employees',
            text: '¿Cuántos empleados utilizarán la red?',
            options: [
                { label: '1 - 5', value: 'small' },
                { label: '6 - 20', value: 'medium' },
                { label: 'Más de 20', value: 'large' },
            ],
        },
        {
            id: 'criticality',
            text: '¿Qué tan crítica es la conexión para tu operación?',
            options: [
                { label: 'Importante (Correo, Facturación)', value: 'standard' },
                { label: 'Alta (Videoconferencias, Cloud)', value: 'high' },
                { label: 'Crítica (Servidores, 24/7)', value: 'critical' },
            ],
        },
    ],
};

export default function PlanRecommender({ mode }: PlanRecommenderProps) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [recommendation, setRecommendation] = useState<{ name: string; speed: string; price: string; reason: string } | null>(null);

    const currentQuestions = questions[mode];

    const handleAnswer = (value: string) => {
        const newAnswers = { ...answers, [currentQuestions[step].id]: value };
        setAnswers(newAnswers);

        if (step < currentQuestions.length - 1) {
            setStep(step + 1);
        } else {
            calculateRecommendation(newAnswers);
        }
    };

    const calculateRecommendation = (finalAnswers: Record<string, string>) => {
        let rec = { name: '', speed: '', price: '', reason: '' };

        if (mode === 'residential') {
            if (finalAnswers.usage === 'heavy' || finalAnswers.devices === 'high') {
                rec = {
                    name: 'Ultra Velocidad',
                    speed: '600 Mbps',
                    price: '$50.00',
                    reason: 'Ideal para múltiples dispositivos, gaming sin lag y trabajo remoto pesado.',
                };
            } else if (finalAnswers.usage === 'streaming' || finalAnswers.devices === 'medium') {
                rec = {
                    name: 'Gamer Pro',
                    speed: '300 Mbps',
                    price: '$35.00',
                    reason: 'Perfecto para streaming en 4K y hogares conectados.',
                };
            } else {
                rec = {
                    name: 'Hogar Básico',
                    speed: '100 Mbps',
                    price: '$25.00',
                    reason: 'Suficiente para navegación fluida y redes sociales.',
                };
            }
        } else {
            // Business Logic
            if (finalAnswers.criticality === 'critical' || finalAnswers.employees === 'large') {
                rec = {
                    name: 'Corporativo Dedicado',
                    speed: 'Simétrico 1:1',
                    price: 'Cotizar',
                    reason: 'Garantía de servicio (SLA), IP fija y soporte prioritario para operaciones críticas.',
                };
            } else if (finalAnswers.criticality === 'high' || finalAnswers.employees === 'medium') {
                rec = {
                    name: 'PYME Pro',
                    speed: '500 Mbps',
                    price: '$80.00',
                    reason: 'Velocidad superior para equipos de trabajo y uso intensivo de la nube.',
                };
            } else {
                rec = {
                    name: 'PYME Emprendedor',
                    speed: '200 Mbps',
                    price: '$45.00',
                    reason: 'La mejor opción para pequeños negocios y puntos de venta.',
                };
            }
        }
        setRecommendation(rec);
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
        setRecommendation(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            {!recommendation ? (
                <div className="animate-fade-in">
                    <div className="grid gap-4">
                        {currentQuestions[step].options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleAnswer(option.value)}
                                className="p-4 rounded-xl border-2 border-transparent bg-surface hover:border-primary/50 hover:bg-surface/80 transition-all duration-300 text-left group"
                            >
                                <span className="text-lg font-medium text-text-main group-hover:text-primary transition-colors">
                                    {option.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-xl text-text-secondary mb-2">Te recomendamos el plan:</h3>
                    <h2 className="text-4xl font-black text-primary mb-4">{recommendation.name}</h2>
                    <div className="text-3xl font-bold text-text-main mb-6">
                        {recommendation.speed} <span className="text-lg text-text-secondary font-normal">| {recommendation.price}</span>
                    </div>
                    <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
                        {recommendation.reason}
                    </p>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={reset}
                            className="px-6 py-3 rounded-full border border-text-secondary/20 text-text-secondary hover:bg-surface transition-colors font-medium"
                        >
                            Volver a empezar
                        </button>
                        <a
                            href="/contacto"
                            className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
                        >
                            Contratar Ahora
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
