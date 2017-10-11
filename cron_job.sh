#!/bin/sh
declare isilonOffer=$(curl http://10.32.111.8:3005/api/isilon/overview | grep -Po '"offered":\d*' | head -n1 | grep -Po '\d*')
echo $isilonOffer>> /root/persist/isilon-offer-trend

declare ecsOffer=$(curl http://10.32.111.8:3005/api/ecs/overview | grep -Po '"offered":\d*' | head -n1 | grep -Po '\d*')
echo $ecsOffer>> /root/persist/ecs-offer-trend

# declare isilonOnboard=$(curl http://10.32.111.8:3005/api/isilon/overview | grep -Po '"onboard":\d*' | head -n1 | grep -Po '\d*')
# echo $isilonOnboard>> /root/persist/isilon-onboard-trend

# declare ecsOnboard=$(curl http://10.32.111.8:3005/api/ecs/overview | grep -Po '"onboard":\d*' | head -n1 | grep -Po '\d*')
# echo $ecsOnboard>> /root/persist/ecs-onboard-trend
