#!/bin/sh
declare ecsPersist=/root/persist/ecs-offer-trend
declare isilonPersist=/root/persist/isilon-offer-trend
declare overviewPersist=/root/persist/overview-offer-trend

declare isilonOffer=$(curl http://10.32.111.8:3005/api/isilon/overview | grep -Po '"offered":\d*' | head -n1 | grep -Po '\d*')
echo $isilonOffer>> $isilonPersist

declare ecsOffer=$(curl http://10.32.111.8:3005/api/ecs/overview | grep -Po '"offered":\d*' | head -n1 | grep -Po '\d*')
echo $ecsOffer>> $ecsPersist

paste $ecsPersist $isilonPersist | awk '{print($1+$2)}' > $overviewPersist

# declare isilonOnboard=$(curl http://10.32.111.8:3005/api/isilon/overview | grep -Po '"onboard":\d*' | head -n1 | grep -Po '\d*')
# echo $isilonOnboard>> /root/persist/isilon-onboard-trend

# declare ecsOnboard=$(curl http://10.32.111.8:3005/api/ecs/overview | grep -Po '"onboard":\d*' | head -n1 | grep -Po '\d*')
# echo $ecsOnboard>> /root/persist/ecs-onboard-trend
