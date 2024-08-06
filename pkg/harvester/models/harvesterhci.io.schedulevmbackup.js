import { HCI } from '../types';
import { get, clone } from '@shell/utils/object';
import { findBy } from '@shell/utils/array';
import { colorForState, stateDisplay } from '@shell/plugins/dashboard-store/resource-class';
import { _CREATE } from '@shell/config/query-params';
import HarvesterResource from './harvester';
import { PRODUCT_NAME as HARVESTER_PRODUCT } from '../config/harvester';
// import { BACKUP_TYPE } from '../config/types';

export default class ScheduleVmBackup extends HarvesterResource {
  detailPageHeaderActionOverride(realMode) {
    if (realMode === _CREATE) {
      return this.t('harvester.schedule.createTitle');
    }
  }

  get detailLocation() {
    const detailLocation = clone(this._detailLocation);
    const route = this.currentRoute();

    detailLocation.params.resource = route.params.resource;

    return detailLocation;
  }

  // get doneOverride() {
  //   const route = this.currentRoute();
  //   const detailLocation = clone(this._detailLocation);

  //   delete detailLocation.params.namespace;
  //   delete detailLocation.params.id;
  //   detailLocation.params.resource = route.params.resource;
  //   detailLocation.name = `${ HARVESTER_PRODUCT }-c-cluster-resource`;
  //   console.log('doneOverride() detailLocation', detailLocation);

  //   return detailLocation;
  // }

  get parentNameOverride() {
    const route = this.currentRoute();

    return this.$rootGetters['i18n/t'](`typeLabel."${ route.params.resource }"`, { count: 1 })?.trim();
  }

  // get parentLocationOverride() {
  //   return this.doneOverride;
  // }

  get _availableActions() {
    const toFilter = ['goToClone'];

    const out = super._availableActions.filter((action) => {
      if (!toFilter.includes(action.action)) {
        return action;
      }
    });

    return [
      {
        action:  'resumeSchedule',
        enabled: true,
        icon:    'icons icon-refresh',
        label:   this.t('harvester.action.resumeSchedule'),
      },
      ...out
    ];
  }

  resumeSchedule(resource = this) {
    // const route = this.currentRoute();
    // const router = this.currentRouter();

    // router.push({
    //   name:   `${ HARVESTER_PRODUCT }-c-cluster-resource-create`,
    //   params: { resource: route.params.resource },
    //   query:  { restoreMode: 'existing', resourceName: resource.name }
    // });
  }

  get state() {
    return this.metadata.state.name;
  }

  get stateBackground() {
    return colorForState(this.stateDisplay).replace('text-', 'bg-');
  }

  get stateColor() {
    return colorForState(this.state);
  }

  get stateDisplay() {
    return stateDisplay(this.metadata.state.name);
  }

  // get attachVM() {
  //   return this.spec.source.name;
  // }

  // get backupContentName() {
  //   return this?.status?.virtualMachineBackupContentName || '';
  // }

  // get backupProgress() {
  //   return {
  //     type:       BACKUP_TYPE.BACKUP,
  //     percentage: this.status?.progress === undefined && !this.status?.readyToUse ? 0 : this.status?.progress,
  //     details:    { volumes: this.status?.volumeBackups }
  //   };
  // }

  // get backupTarget() {
  //   return this?.status?.backupTarget?.endpoint || '';
  // }

  // get attachVmExisting() {
  //   const vmList = this.$rootGetters['harvester/all'](HCI.VM);

  //   return !!vmList.find( V => V.metadata.name === this.attachVM);
  // }

  // remove() {
  //   const opt = { ...arguments };

  //   opt.params = { propagationPolicy: 'Foreground' };

  //   return this._remove(opt);
  // }
}
