#include<iostream>
#include<string>
using namespace std;
int numberOfWays(string corridor) {
        int numberSeats = 0;



        int x = 0;
        int somme = 0;
        for (int i = 0; i < corridor.length(); i++) {
            if(corridor[i] == 'S'){
                numberSeats++;
                if(x!=2){
                    x++;
                }
                else if(x==2){
                    somme++;
                    x=1;
                }
            }
            else if(corridor[i] == 'P' && x==2)
                somme++;
        }
        if(numberSeats==0 || numberSeats%2!=0)
            return 0;
        if(numberSeats==2)
            return 1;
        return somme;
    }

    int main(){
        cout << numberOfWays("SSPPSPS") << endl; // Example usage
        return 0;
    }





//"SPS PP SS P SS SS"
  //  SS PP SPS PPP SS PP SS 