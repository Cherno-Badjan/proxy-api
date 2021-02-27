function formatLocation(data) {
    return {
        formatted_query: data[0].display_name,
        latitude: data[0].lat,
        longitude: data[0].lon,
    };
}

function mungeWeather(weatherData) {
    const formattedResponse = weatherData.data.map(weatherItem => {
        return {
            forecast: weatherItem.weather.description,
            time: new Date(weatherItem.ts * 1000).toDateString(),
        };
    });

    const finalResponse = formattedResponse.slice(0, 10);
    return finalResponse;
}

function mungeReview(reviewData) {
    const formattedResponse = reviewData.businesses.map(reviewItem => {
        return {
            name: reviewItem.name,
            image_url: reviewItem.image_url,
            price: reviewItem.price,
            rating: reviewItem.rating,
            url: reviewItem.url,
        };
    });
    return formattedResponse;
}


module.exports = {
    formatLocation,
    mungeWeather,
    mungeReview
};