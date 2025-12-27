import { useState } from 'react';
import { useUser } from './UserContext';

export function OnboardingView({ onComplete }: { onComplete: () => void }) {
    const { updateProfile, completeOnboarding } = useUser();
    const [step, setStep] = useState(0);
    const [height, setHeight] = useState(165);

    const handleFinish = () => {
        updateProfile({ heightCm: height });
        completeOnboarding();
        onComplete();
    };

    const containerStyle = {
        padding: '32px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '24px',
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center' as const,
    };

    const buttonStyle = {
        background: 'var(--color-primary)',
        color: 'white',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        fontSize: '1.0rem',
        marginTop: 'auto',
        fontWeight: 600,
    };

    const inputStyle = {
        width: '100%',
        padding: '16px',
        fontSize: '1.5rem',
        textAlign: 'center' as const,
        border: '2px solid var(--color-secondary)',
        borderRadius: 'var(--radius-sm)',
        outline: 'none',
    };

    // 步骤 0: 欢迎
    if (step === 0) {
        return (
            <div style={containerStyle}>
                <div style={{ fontSize: '3rem' }}>🌿</div>
                <h1>欢迎使用 Shecover</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                    帮助你理解身体的独特运动语言。
                    <br /><br />
                    让我们根据你的身体结构调整分析。
                </p>
                <button style={buttonStyle} onClick={() => setStep(1)}>
                    开始设置
                </button>
            </div>
        );
    }

    // 步骤 1: 身高
    if (step === 1) {
        return (
            <div style={containerStyle}>
                <h2>你的身体结构</h2>
                <p>身高帮助我们更准确地计算你的杠杆和角度。</p>

                <div style={{ margin: '32px 0' }}>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        style={inputStyle}
                    />
                    <div style={{ marginTop: '8px', color: 'var(--color-text-secondary)' }}>厘米</div>
                </div>

                <button style={buttonStyle} onClick={handleFinish}>
                    完成
                </button>
            </div>
        );
    }

    return null;
}
