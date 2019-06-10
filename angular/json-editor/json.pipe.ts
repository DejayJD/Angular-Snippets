import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";


@Pipe({name: 'iterableJson'})
export class JSONIterablePipe implements PipeTransform {

  transform(value, args: string[]): any {
    return this.convert(value);
  }

  public convert = function (value) {
    let keys = [];
    if (typeof value === "object") {
      for (let key in value) {
        //Is an Array of objects
        //Ex. [{"key1":"hello"}, {"key2":"world"}]
        if (value[key] instanceof Array && value[key].length > 0) {
          let children = [];
          for (let i in value[key]) {
            let val = null;
            if (value[key][i] == null) {
              val = {value: "null"}
            }
            else if (typeof value[key][i] !== "object") {
              val = {value: value[key][i]};
            }
            else {
              val = this.convert(value[key][i]);
              val = {
                key: null,
                children: val
              }
            }
            children.push(val);
          }
          let obj = {
            key: key,
            children: children,
            array: true
          };
          keys.push(obj);
        } else
        //Is an Object
        //Ex. {"key1":"hello", "key2":"world", "key3":{...}, "key4":[]}
        if (typeof value[key] === "object" && value[key] != null) {
          let obj = null;
          if (typeof(value[key]) === "object" && !Array.isArray(value[key])) {
            obj = {
              key: key,
              children: this.convert(value[key])
            }
          }
          if (obj != null) {
            keys.push(obj);
          }
        }
        //Is a tuple
        //Ex. {key:value}
        else {
          keys.push({key: key, value: value[key]});
        }
      }
    }
    return keys;
  };

  public static reversePipe = function (jsonData, isArray = false) {
    let results: any = {};
    if (isArray) {
      results = [];
    }
    if (jsonData == null) {
      return jsonData;
    }
    else {
      for (let item of jsonData) {
        let newValue = item.value != null ? item.value : this.reversePipe(item.children);
        if (item.children != null) {
          if (item.children.length > 0) {
            if (item.array) {
              results[item.key] = this.reversePipe(item.children, true);
            }
          }
        }
        if (results[item.key] == null) {
          if (isArray) {
            if (item.key != null) {
              let val = newValue;
              newValue = {};
              newValue[item.key] = val;
            }
            results.push(newValue);
          }
          else {
            results[item.key] = newValue;
          }
        }
      }
    }
    return results;
  }
}
