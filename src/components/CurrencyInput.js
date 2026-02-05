'use client';

export default function CurrencyInput({ value, onChange, placeholder = 'R$ 0,00', className }) {
  
  const formatDisplay = (val) => {
    if (!val && val !== 0) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  const handleChange = (e) => {
   
    const rawValue = e.target.value.replace(/\D/g, '');
    
    const numericValue = Number(rawValue) / 100;

    
    onChange(numericValue);
  };

  return (
    <input
      type="text"
      inputMode="numeric" 
      value={formatDisplay(value)}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}