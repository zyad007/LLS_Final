import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { PermissionOnePage } from '../../../models/permissions';
import { PermissionsPageActions } from '../action/permissions-type';

export const initState: PermissionOnePage = {
  currentPage: 1,
};
export const PermissionsPageReducer = createReducer(
  initState,
  on(PermissionsPageActions.PermissionsPageLoaded, (state, action) =>
    action.Permissions
      ? {
          ...state,
          [action.currentPage]: action.Permissions,
          currentPage: action.currentPage,
        }
      : state
  ),
  on(PermissionsPageActions.PermissionsNextLoaded, (state, action) => {
    if (action.Permissions) {
      return {
        ...state,
        [action.currentPage]: action.Permissions,
        currentPage: action.currentPage,
      };
    } else {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
  }),
  on(PermissionsPageActions.PermissionsEdited, (state, action) => {
    const newDict = cloneDeep(state);
    const index = newDict?.[state.currentPage]?.data?.result?.findIndex(
      (val) => {
        return val.idd === action.Permission.idd;
      }
    )!;
    let data = newDict?.[state?.currentPage]?.data?.result.splice(
      index,
      1,
      action.Permission
    )!;
    return action
      ? {
          ...state,
          ...newDict,
        }
      : state;
  }),
  on(PermissionsPageActions.yourPermissionDeleted, (state, action) => {
    const newDict = cloneDeep(state);
    newDict[state.currentPage].data.result = newDict?.[
      state?.currentPage
    ]?.data?.result.filter((val) => {
      return val.idd !== action.PermissionId;
    });
    return {
      ...state,
      ...newDict,
    };
  })
);
