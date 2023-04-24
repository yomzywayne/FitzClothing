export const ConvertMeasurementsToChartMetrics = (allUserMeasurements, allProductMeasurements, minimumFitPercent, maximumVariantPerMeasurementInCmForFit) => {

  if (!allUserMeasurements || !allProductMeasurements) {
    return null;
  }
    
    const uncomparableKeys = ['createdAt', 'productId', 'updatedAt', '__v', '_id'];  
    const productMeasurementKeys = Object.keys(allProductMeasurements);
    const commonMeasurementKeys = productMeasurementKeys.filter(key => uncomparableKeys.indexOf(key) < 0);
    
    let chartLabels = [];
    let userMeasurements = [];
    let productMeasurements = [];
    var compoundedFitVariance = 1;
    var totalUserMeasurements = 0;
    var totalProductMeasurements = 0;
    var totalMeasurementsVariance = 0;
    var metMaximumVariantPerMeasurementInCmForFitRule = true;
    var rulesNotMet = [];
    
    for(var index = 0; index < commonMeasurementKeys.length; index++) {
      const measurementKey = commonMeasurementKeys[index];      
      if (allProductMeasurements[measurementKey] && allUserMeasurements[measurementKey]) {
        chartLabels.push(measurementKey);
        userMeasurements.push(Number(allUserMeasurements[measurementKey]));
        productMeasurements.push(Number(allProductMeasurements[measurementKey]));

        const userMeasurement = Number(allUserMeasurements[measurementKey]);
        const productMeasurement = Number(allProductMeasurements[measurementKey]);
        totalUserMeasurements += userMeasurement;
        totalProductMeasurements += productMeasurement;        

        const measurementVariance = Math.abs(userMeasurement - productMeasurement);
        if (measurementVariance >= maximumVariantPerMeasurementInCmForFit) {
          metMaximumVariantPerMeasurementInCmForFitRule = false;
        }

        if (measurementVariance > 0) {
            totalMeasurementsVariance += measurementVariance;
            compoundedFitVariance += compoundedFitVariance * (measurementVariance/userMeasurement);
        }
      }
    }

    const compoundedUnfitVariancePercent = Math.round((compoundedFitVariance/totalUserMeasurements) * 100);
    const arithmeticUnfitVariancePercent = Math.round((totalMeasurementsVariance/totalUserMeasurements) * 100);
    const compoundedFitVariancePercent = 100 - compoundedUnfitVariancePercent;
    const arithmeticFitVariancePercent = 100 - arithmeticUnfitVariancePercent;

    if (metMaximumVariantPerMeasurementInCmForFitRule === false) {
      rulesNotMet.push("Minimum measurement variance");
    }

    if (arithmeticFitVariancePercent < minimumFitPercent) {
      rulesNotMet.push("Minimum measurements percentage");
    }

    const compoundedFitNofitDecision = compoundedFitVariancePercent >= minimumFitPercent && metMaximumVariantPerMeasurementInCmForFitRule ? "FIT" : "NO FIT";
    const arithmenticFitNofitDecision = arithmeticFitVariancePercent >= minimumFitPercent && metMaximumVariantPerMeasurementInCmForFitRule ? "FIT" : "NO FIT";


    const chartMetrics = {
        chartLabels: chartLabels,
        userMeasurements: userMeasurements,
        productMeasurements: productMeasurements,
        totalUserMeasurements: totalUserMeasurements,
        totalProductMeasurements: totalProductMeasurements,
        totalMeasurementsDifference: totalMeasurementsVariance,
        totalUserMeasurementsMatched: totalUserMeasurements - totalMeasurementsVariance,

        arithmeticFitVariancePercent: String(arithmeticFitVariancePercent) + "%",
        compoundedFitVariancePercent : String(compoundedFitVariancePercent) + "%",
        arithmeticUnfitVariancePercent: String(arithmeticUnfitVariancePercent) + "%",
        compoundedUnfitVariancePercent : String(compoundedUnfitVariancePercent) + "%",
        compoundedFitNofitDecision: compoundedFitNofitDecision,
        arithmenticFitNofitDecision: arithmenticFitNofitDecision,
        rulesNotMetColor: 'red',
        rulesNotMet: rulesNotMet
    };

    return chartMetrics;
}