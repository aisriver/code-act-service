// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAntd from '../../../app/controller/antd';
import ExportCode from '../../../app/controller/code';
import ExportDemo from '../../../app/controller/demo';
import ExportFile from '../../../app/controller/file';
import ExportFolder from '../../../app/controller/folder';

declare module 'egg' {
  interface IController {
    antd: ExportAntd;
    code: ExportCode;
    demo: ExportDemo;
    file: ExportFile;
    folder: ExportFolder;
  }
}
