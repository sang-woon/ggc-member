// cn utility function for combining Tailwind classes
// Inspired by shadcn/ui's class management approach

/**
 * Combines multiple class strings and handles conditional classes
 * @param {...(string|undefined|null|false)} inputs - Class strings to combine
 * @returns {string} - Combined class string
 */
function cn(...inputs) {
    return inputs
        .filter(Boolean)
        .join(' ')
        .trim()
        .replace(/\s+/g, ' ');
}

// Export for use in other scripts
window.cn = cn;

// Tailwind-like class variance management
window.cva = function(base, config = {}) {
    return function(props = {}) {
        let classes = base;
        
        // Apply variants
        if (config.variants) {
            Object.entries(props).forEach(([key, value]) => {
                if (config.variants[key] && config.variants[key][value]) {
                    classes = cn(classes, config.variants[key][value]);
                }
            });
        }
        
        // Apply compound variants
        if (config.compoundVariants) {
            config.compoundVariants.forEach(compound => {
                const matches = Object.entries(compound)
                    .filter(([key]) => key !== 'class')
                    .every(([key, value]) => props[key] === value);
                
                if (matches) {
                    classes = cn(classes, compound.class);
                }
            });
        }
        
        // Apply default variants
        if (config.defaultVariants) {
            Object.entries(config.defaultVariants).forEach(([key, value]) => {
                if (props[key] === undefined && config.variants[key] && config.variants[key][value]) {
                    classes = cn(classes, config.variants[key][value]);
                }
            });
        }
        
        return cn(classes, props.className);
    };
};