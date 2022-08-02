import * as assert from 'assert';

import { group } from '../group';

const ROOT = 'github.com/blackdahila';
const LOCAL = 'github.com/heetch';

suite('Group Test', () => {
  test('should return the same list if all imports are from the same group', () => {
    const imports = [
      'fmt',
      'math',
      'errors',
    ];
    const groupedImports = group(imports, ROOT, LOCAL);

    assert.deepEqual(groupedImports.stdlib, imports);
    assert.deepEqual(groupedImports.own, []);
    assert.deepEqual(groupedImports.thirdParty, []);
  });

  test('should return group imports for two different groups', () => {
    const imports = ['fmt', 'math', 'errors', 'github.com/package/package'];
    const groupedImports = group(imports, ROOT, LOCAL);

    assert.deepEqual(groupedImports.stdlib, imports.slice(0, 3));
    assert.deepEqual(groupedImports.thirdParty, imports.slice(3));
    assert.deepEqual(groupedImports.own, []);
  });

  test('should return separated third party imports from own imports', () => {
    const imports = ['github.com/blackdahila/package', 'github.com/package/package'];
    const groupedImports = group(imports, ROOT, LOCAL);

    assert.deepEqual(groupedImports.thirdParty, [imports[1]]);
    assert.deepEqual(groupedImports.own, [imports[0]]);
    assert.deepEqual(groupedImports.stdlib, []);
  });

  test('should return grouped mixed imports', () => {
    const imports = [
      'github.com/blackdahila/package',
      'github.com/package/package',
      'math',
      'fmt',
      'err "errors"',
      'database/sql',
      'github.com/jmoiron/sqlx',
      'test "github.com/blackdahila/testing"',
      'galaxy github.com/heetch/galaxy-go/v2'
    ];
    const groupedImports = group(imports, ROOT, LOCAL);

    assert.deepEqual(groupedImports.thirdParty, [
      'github.com/package/package',
      'github.com/jmoiron/sqlx',
    ]);
    assert.deepEqual(groupedImports.own, [
      'github.com/blackdahila/package',
      'test "github.com/blackdahila/testing"',
    ]);
    assert.deepEqual(groupedImports.local, [
      'galaxy github.com/heetch/galaxy-go/v2',
    ]);
    assert.deepEqual(groupedImports.stdlib, [
      'math',
      'fmt',
      'err "errors"',
      'database/sql',
    ]);
  });

  test('should work also when local and own colide', () => {
    const imports = [
      'avropassengerphase "github.com/heetch/contracts/pkg/generated/avro/phasing/passenger_phase"',
      'avroorderphase "github.com/heetch/contracts/pkg/generated/avro/phasing/phases_for_order"',
      'avropickup "github.com/heetch/contracts/pkg/generated/avro/pickup_experience/pickup_experience"',
      'phasingapigrpc "github.com/heetch/contracts/pkg/phasing/api/v1"',
      'phasingpb "github.com/heetch/contracts/pkg/phasing/v1"',
      '"context"',
      '"testing"',
      '"time"',
      '"github.com/Shopify/sarama"',
      'qt "github.com/frankban/quicktest"',
      '"github.com/google/go-cmp/cmp/cmpopts"',
      'gouuid "github.com/google/uuid"',
      'acidqtest "github.com/heetch/acidq/v2/kafka/kafkatest"',
      '"github.com/heetch/avro/avroregistry"',
      '"github.com/heetch/avro/avroregistrytest"',
      'avrobr "github.com/heetch/contracts/pkg/generated/avro/booking/booking_request"',
      'avrodriverphase "github.com/heetch/contracts/pkg/generated/avro/phasing/driver_phase"',
      '"github.com/heetch/galaxy-go/v2/database/postgresql"',
      '"github.com/heetch/universe/src/services/phasing/core/pkg/kafka"',
      'pgtest "github.com/heetch/galaxy-go/v2/database/postgresql/postgresqltest"',
      'kafkago "github.com/heetch/galaxy-go/v2/events/kafka"',
      '"github.com/heetch/galaxy-go/v2/service/servicetest"',
      '"github.com/heetch/galaxy-go/v2/ucontext"',
      '"github.com/heetch/sqalx"'
    ];

    const groupedImports = group(imports, "github.com/heetch/universe/src/services/phasing/core", "github.com/heetch");
    assert.deepEqual(groupedImports.thirdParty, [
      '"github.com/Shopify/sarama"',
      'qt "github.com/frankban/quicktest"',
      '"github.com/google/go-cmp/cmp/cmpopts"',
      'gouuid "github.com/google/uuid"',
    ]);
    assert.deepEqual(groupedImports.own, [
      '"github.com/heetch/universe/src/services/phasing/core/pkg/kafka"',
    ]);
    assert.deepEqual(groupedImports.local, [
      'avropassengerphase "github.com/heetch/contracts/pkg/generated/avro/phasing/passenger_phase"',
      'avroorderphase "github.com/heetch/contracts/pkg/generated/avro/phasing/phases_for_order"',
      'avropickup "github.com/heetch/contracts/pkg/generated/avro/pickup_experience/pickup_experience"',
      'phasingapigrpc "github.com/heetch/contracts/pkg/phasing/api/v1"',
      'phasingpb "github.com/heetch/contracts/pkg/phasing/v1"',
      'acidqtest "github.com/heetch/acidq/v2/kafka/kafkatest"',
      '"github.com/heetch/avro/avroregistry"',
      '"github.com/heetch/avro/avroregistrytest"',
      'avrobr "github.com/heetch/contracts/pkg/generated/avro/booking/booking_request"',
      'avrodriverphase "github.com/heetch/contracts/pkg/generated/avro/phasing/driver_phase"',
      '"github.com/heetch/galaxy-go/v2/database/postgresql"',
      'pgtest "github.com/heetch/galaxy-go/v2/database/postgresql/postgresqltest"',
      'kafkago "github.com/heetch/galaxy-go/v2/events/kafka"',
      '"github.com/heetch/galaxy-go/v2/service/servicetest"',
      '"github.com/heetch/galaxy-go/v2/ucontext"',
      '"github.com/heetch/sqalx"'
    ]);
    assert.deepEqual(groupedImports.stdlib, [
      '"context"',
      '"testing"',
      '"time"',
    ]);
  })
});
