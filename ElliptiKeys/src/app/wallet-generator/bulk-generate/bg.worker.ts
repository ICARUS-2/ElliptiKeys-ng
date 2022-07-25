/// <reference lib="webworker" />
import SingleAddressModel from './../../../../models/single-address-model';

function bulkGenerate(data: any)
{
  let qtyToGenerate = data["qtyToGenerate"];
  let isTestnet = data["isTestnet"];
  let selectedAddressType = data["selectedAddressType"];

  let tempArr: SingleAddressModel[] = [];

  for(let i = 0; i < qtyToGenerate; i++)
  {
    tempArr.push( SingleAddressModel.create(isTestnet, selectedAddressType) )
  }
  return tempArr;
}

addEventListener('message', ({ data }) => {
  const response = bulkGenerate(data);
  postMessage(response);
});
