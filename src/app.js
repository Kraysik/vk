// Maximum size of sms chunk
const SIZE = 140;

/**
 * @param {string} text
 *
 * @return {String[]}
 * */
window.splitSMSToChunks = function (text) {
  if (text === '') throw new Error('Empty text');

  const chunksCount = Math.ceil(text.length / SIZE);
  if (chunksCount === 1) return [text];

  const chunks = [];

  let chunkStartIdx = 0;
  for (let i = 0; i < chunksCount; i++) {
    const ending = ` ${i+1}/${chunksCount}`;
    let chunkEndIdx = text.substring(chunkStartIdx, SIZE - ending.length).lastIndexOf(" ");

    let currentChunk = (chunkEndIdx ? text.substring(chunkStartIdx, chunkEndIdx) : text.substring(chunkStartIdx)) + ending;
    chunks.push(currentChunk);

    chunkStartIdx = chunkEndIdx;
  }

  return chunks;
}

console.log(splitSMSToChunks('Lorem ipsum dolor sit amet consectetur adipiscing elit')) // string length = 54
console.log(splitSMSToChunks(`Lorem ipsum dolor sit amet consectetur adipiscing elit 
consectetur adipiscing elit adipiscing elit elit consectetur adipiscing elit adipiscing`)) // string length = 143
console.log(splitSMSToChunks(`Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at 
magna pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget 
Sed sit amet posuere risus`)) // string length = 188
console.log(splitSMSToChunks(''))
