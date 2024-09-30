export function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 28,
            height:28,
            fontSize:"14px",
            fontFamily: "Poppins"
        },
        //children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        children: `${name.split(' ')[0][0].toUpperCase()}`,
    };
}

export function formatPrice(currencyType, price, exchangeRate=1300) {
    let priceInNaira = price.toFixed(2)
    if (currencyType === "Naira") {
        return `N${AddComma(priceInNaira)}`;
    } else if (currencyType === "Dollar") {
        const priceInDollars = (price / exchangeRate).toFixed(2);
        return `$${AddComma(priceInDollars)}`;
    } else {
        return "Invalid currency type";
    }
}

export function AddComma(price) {
    // Convert price to string and split it into integer and decimal parts
    const [integerPart, decimalPart] = String(price).split('.');

    // Add commas for thousands, hundred thousands, etc. using regex
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine integer and decimal parts with a dot (if decimal part exists)
    return decimalPart ? formattedIntegerPart + '.' + decimalPart : formattedIntegerPart;
} 
