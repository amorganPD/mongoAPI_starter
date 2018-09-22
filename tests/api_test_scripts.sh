 #!/bin/sh

DATE=`date +%Y-%m-%d`
LOGDIR='./TestOutput/'
FILENAME=$LOGDIR$DATE'_api_test_scripts.json'
urlBase='http://localhost:3000/'

jq='/c/dev/tools/jq-win64.exe'

mkdir -p $LOGDIR
rm -f $FILENAME

echo $'\nSTART **********************************************************************************\n' >> $FILENAME

echo "Enter in new user: "
read newUser

# /user/ POST, GET, PUT, and DELETE tests
url=$urlBase'user/'
echo $'TEST '$url >> $FILENAME
output=$(curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Connection: close" -w "\nHTTP: %{http_code}" \
-X POST -d '{"username":"'$newUser'","displayName":"friendly name"}' \
$url)
echo "$output" >> $FILENAME
# Parse Output
userId=$(echo "$output" | head -n 1 | $jq -r '._id')
echo $'TEST DONE\n' >> $FILENAME

url=$urlBase'user/'$newUser
echo $'TEST '$url >> $FILENAME
output=$(curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Connection: close" -w "\nHTTP: %{http_code}" \
$url)
echo "$output" >> $FILENAME
echo $'TEST DONE\n' >> $FILENAME

url=$urlBase'user/'
echo $'TEST '$url >> $FILENAME
output=$(curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Connection: close" -w "\nHTTP: %{http_code}" \
-X PUT -d '{"username":"'$newUser'","displayName":"changed name"}' \
$url)
echo "$output" >> $FILENAME
# Parse Output
nModified=$(echo "$output" | head -n 1 | $jq -r '.nModified')
echo $'TEST DONE\n' >> $FILENAME

url=$urlBase'user/'$newUser
echo $'TEST '$url >> $FILENAME
output=$(curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Connection: close" -w "\nHTTP: %{http_code}" \
-X DELETE \
$url)
echo "$output" >> $FILENAME
echo $'TEST DONE\n' >> $FILENAME

# /user/ POST, GET, and PUT tests


passcount=$(grep -c "HTTP: 200" $FILENAME)
totalcount=$(grep -c "TEST DONE" $FILENAME)
errorcount=$(expr $totalcount - $passcount)

echo '************************************************************************'
echo Summary
echo 
echo Test Passed: $passcount
echo Test Failed: $errorcount

echo $'\nEND ************************************************************************************\n' >> $FILENAME