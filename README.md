How to it works:
Since it's hard to generate two identical voice samples of length and content, we can potentailly use the buffer for randomness.

1. Record audio
2. Convet audio blob into audio buffer that is in8
3. Start from the middle of the buffer in case encoding's start contains more metadata to make it more random
4. grab the value at index / 255 for a value between 0 and 1 and then change index by adding the value with the index and adding nth iteration incase we create some loop
5. repeat step 4 for 100 times
6. display the values in a textarea

Overall it doesn't use any crypto library or hashing and purely uses the audio sample for generating randomness. The blob seems to be opus codec locally, maybe it won't hold for other codecs?

I tried it using https://cieciura.net/mp/kalkulatory/randomness.htm for randomness and suggests random. Math.random() shows similar p value it seems
